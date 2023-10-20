/**
 * 根据静态资源地址下载多个资源文件为一个压缩包
 */
import streamSaver from 'streamsaver';
import ZIP from './zip';
import pMap from 'p-map'; // 一个可以控制异步并发数量的库，类似于promise.all()


export default function downloadFromStaticFiles(files, zipName, options){
  const fileName = options.fileName;
  const { concurrency = 5 } = options;
  const fileStream = streamSaver.createWriteStream(zipName);
  const readableZipStream = new ZIP({
    async pull(ctrl) {
      const mapper = async (file) => {
        const url = `http:xxxxxx//${file}`
        return fetch(url).then(({ body }) => {
          ctrl.enqueue({
            name: typeof fileName === 'function' ? fileName(file) : fileName,
            stream: () => body,
          });
        });
      };
      await pMap(files, mapper, { concurrency });
      ctrl.close();
    },
  });
  // more optimized
  if (window.WritableStream && readableZipStream.pipeTo) {
    // eslint-disable-next-line
    return readableZipStream.pipeTo(fileStream).then(() => console.log('done writing'));
  }
  // less optimized
  const writer = fileStream.getWriter();
  const reader = readableZipStream.getReader();
  const pump = () =>
    reader.read().then((res) => (res.done ? writer.close() : writer.write(res.value).then(pump)));
  pump();
}

/**
 * 使用举例： 
  downloadFromStaticFiles(files, `demo.zip`, {
    fileName: file => file.replace(`xxx`, ''),
    concurrency: 6
  });
 */