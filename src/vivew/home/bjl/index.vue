<script>
export default {
  beforeRouteEnter(to, from, next) {
    let formVm = from.matched[0].instances.default;
    location.href = '//' + ('api_path' in formVm.$store.state && formVm.$store.state.api_path ? formVm.$store.state.api_path : formVm.$store.state.basic.static_path) + '/home/bjl/' + (formVm.$store.state.login ? '?token=' + localStorage.getItem('pragma') : '');
  }
}
</script>