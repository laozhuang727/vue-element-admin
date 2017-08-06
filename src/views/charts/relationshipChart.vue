<template>
  <div class="components-container" style='height:100vh'>
    <div class='chart-container'>
      <relationship-chart height='100%' width='100%'></relationship-chart>
    </div>
  </div>
</template>

<script>
  import relationshipChart from 'components/Charts/relationshipChart';

  export default {
    components: { relationshipChart }
  };
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: 90%;
}
</style>

