export default {
  props: ['tsx'],
  setup(props){
    return () => {
      return props.tsx
    }
  }
}