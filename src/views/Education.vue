<template>
    <div class="education">
      <h1>Education</h1>
      <div class="ncsu">
        <h3>North Carolina State University</h3>
        <p><b>Degree:</b> Bachelor of Science (BS)</p>
        <p><b>Field of study:</b> Computer Science</p>
        <p><b>Start Year:</b> 2014</p>
        <p><b>End Year:</b> 2017</p>
        <p><b>Grade:</b> 3.73/4.0</p>
      </div>
      <GChart :settings="{ packages: ['timeline']}" type="Timeline" :data="ncsuChartData" :options="ncsuChartOptions"/>
      <div>
        <h3>Wake Technical Community College</h3>
        <p><b>Degree:</b> Associate of Science (A.S.)</p>
        <p><b>Field of study:</b> General Studies</p>
        <p><b>Start Year:</b> 2010</p>
        <p><b>End Year:</b> 2014</p>
        <p><b>Grade:</b> 3.31/4.0</p>
      </div>
      <GChart :settings="{ packages: ['timeline']}" type="Timeline" :data="wtccChartData"/>
    </div>
</template>
<script>
    export default {
      name: 'Education',
      data () {
        return {
          chartsLib: null,
          ncsuChartData: [
            [ 'School Name', 'Start', 'End'],
            [ 'North Carolina State University', new Date(2014, 1, 19), new Date(2017, 12, 30)]
          ],
          wtccChartData: [
            [ 'School Name', 'Start', 'End'],
            [ 'Wake Technical Community College', new Date(2010, 8, 19), new Date(2014, 12, 30)]
          ]
        }
      },
      computed: {
        ncsuChartOptions () {
          return ({colors: [ '#d95f02']})
        }
      },
      methods: {
        onChartReady (chart, google) {
          this.chartsLib = google
        }
      }
    }
</script>
<style>
  .ncsu{
    #background-image: url("../assets/ncstate-type-2x2-red.png");
  }
</style>
