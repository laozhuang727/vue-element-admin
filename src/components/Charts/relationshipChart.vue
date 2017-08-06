<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';
  import $ from 'jquery'
  import {getRelationshipData} from 'api/chartsApi';
  import {getArticle} from 'api/article';


  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      }
    },
    data() {
      return {
        chart: null,
        option: null,
      };
    },
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id));

        this.chart.showLoading();
        getRelationshipData().then(response => {
          debugger
          this.chart.hideLoading();
          var webkitDep = response.data

          this.option = {
            legend: {
              data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
            },
            series: [{
              type: 'graph',
              layout: 'force',
              animation: false,
              label: {
                normal: {
                  position: 'right',
                  formatter: '{b}'
                }
              },
              draggable: true,
              data: webkitDep.nodes.map(function (node, idx) {
                node.id = idx;
                return node;
              }),
              categories: webkitDep.categories,
              force: {
                // initLayout: 'circular'
                // repulsion: 20,
                edgeLength: 5,
                repulsion: 20,
                gravity: 0.2
              },
              edges: webkitDep.links
            }]
          };

          this.chart.setOption(this.option);

        }).catch(err => {
          debugger
          this.fetchSuccess = false;
          console.log(err);
        });


//         $.get('chats-data/relationship', function (webkitDep) {
//           debugger
//           this.chart.hideLoading();
//
//           option = {
//             legend: {
//               data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
//             },
//             series: [{
//               type: 'graph',
//               layout: 'force',
//               animation: false,
//               label: {
//                 normal: {
//                   position: 'right',
//                   formatter: '{b}'
//                 }
//               },
//               draggable: true,
//               data: webkitDep.nodes.map(function (node, idx) {
//                 node.id = idx;
//                 return node;
//               }),
//               categories: webkitDep.categories,
//               force: {
//                 // initLayout: 'circular'
//                 // repulsion: 20,
//                 edgeLength: 5,
//                 repulsion: 20,
//                 gravity: 0.2
//               },
//               edges: webkitDep.links
//             }]
//           };
//
//           this.chart.setOption(option);
//         });
      }
    }
  }
</script>
