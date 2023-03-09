<template lang="pug">
  div
    v-dialog(v-model="dialog")
      v-card
        v-card-title 导出中..
        .pa-8.text-center
          v-progress-circular(indeterminate, color="primary")

</template>

<script>
import html2canvas from 'html2canvas';
import * as echarts from 'echarts';

export default {
  name: 'Print',
  data() {
    return {
      dialog: false,

      components: {},
      summary: {},
    };
  },
  computed: {
    ranks: () => [
      { name: 'All', color: '#333333', hint: '全部' },
      { name: 'Unlocked', color: '#666666', hint: '已解锁' },
      { name: 'C', color: '#FFB74D', hint: '已Clear' },
      { name: 'F', color: '#F06292', hint: '已Full Combo' },
      { name: 'P', color: '#FFFFFF', hint: '已All Perfect' },
    ],
    options() {
      let minLevel = 0, maxLevel = 0;
      for (let musicId in this.$db.musicDifficulties) {
        for (let musicDifficulty in this.$db.musicDifficulties[musicId]) {
          let level = this.$db.musicDifficulties[musicId][musicDifficulty].playLevel;
          if (!minLevel) {
            minLevel = level;
            maxLevel = level;
          } else {
            minLevel = Math.min(minLevel, level);
            maxLevel = Math.max(maxLevel, level);
          }
        }
      }
      let levels = [];
      for (let i = minLevel; i <= maxLevel; i++) {
        levels.push(i);
      }

      return {
        grid: { 'top': 48, 'bottom': 32, 'left': 32, 'right': 32 },
        yAxis: {
          type: 'category',
          data: levels,
          inverse: true,
          axisTick: { alignWithLabel: true },
        },
        xAxis: {
          type: 'value',
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        legend: {
          // orient: 'vertical',
          selectedMode: false,
          icon: 'roundRect',
          textStyle: { color: '#FFFFFF' },
          top: 16,
          data: this.ranks.slice(1).map(rank => rank.hint),
          itemWidth: 14,
          itemHeight: 14,
        },
        series: this.ranks.map(rank => ({
          name: rank.hint,
          type: 'bar',
          barGap: '-100%',
          symbol: 'none',
          connectNulls: true,
          color: rank.color,
          areaStyle: { color: rank.color },
          data: levels.map(i => this.summary[rank.name][i] / this.summary['All'][i]),
          label: {
            show: true,
            distance: 3,
            position: 'right',
            color: rank.color,
            textBorderColor: '#FFF',
            textBorderWidth: {
              'P': 0.5,
              'F': 1.0,
            }[rank.name] || 0,
            fontWeight: 500,
            formatter: params => {
              let rank = this.ranks.find(rank => rank.hint == params.seriesName);
              if (rank.name == 'Unlocked') return '';
              let value = this.summary[rank.name][params.name];
              if (!value) return '';
              return value;
            }
          },
        })),
      };
    },
  },
  methods: {
    print() {
      this.dialog = true;
      this._print().then(() => this.dialog = false);
    },
    async _print() {
      let options = {
        backgroundColor: '#121212',
        useCORS: true,
        scale: 2.0,
      };

      let chart = document.createElement('canvas');
      chart.width = 360;
      chart.height = 720;
      echarts.init(chart, undefined, { devicePixelRatio: options.scale }).setOption(this.options);

      let components = [
        {
          id: 'profile',
          x: 0,
          y: 16,
          getWindowWidth: () => {
            switch (this.$vuetify.breakpoint.name) {
              case 'xs': return 360;
              case 'sm': return 360;
              case 'md': return 720;
              case 'lg': return 1080;
              case 'xl': return 1800;
            }
          },
        },
        {
          id: 'summaryByDifficulty',
          x: 0,
          y: 16 + 234 + 16,
          getWindowWidth: () => {
            switch (this.$vuetify.breakpoint.name) {
              case 'xs': return 360;
              case 'sm': return 360;
              case 'md': return 721;
              case 'lg': return 1083;
              case 'xl': return 1324;
            }
          },
        },
        {
          id: 'r',
          x: 0,
          y: 16 + 234 + 16 + 206 + 16,
          getWindowWidth: () => {
            switch (this.$vuetify.breakpoint.name) {
              case 'xs': return 360;
              case 'sm': return 360;
              case 'md': return 721;
              case 'lg': return 1083;
              case 'xl': return 1324;
            }
          },
        },
        {
          canvas: chart,
          x: 0,
          y: 16 + 234 + 16 + 206 + 16 + 42 + 16,
        },
        {
          id: 'best39',
          x: 360,
          y: 16,
          getWindowWidth: () => {
            switch (this.$vuetify.breakpoint.name) {
              case 'xs': return 440;
              case 'sm': return 440;
              case 'md': return 828;
              case 'lg': return 1189;
              case 'xl': return 1537;
            }
          },
        },
      ];

      let canvas = document.createElement('canvas');
      canvas.width = 800 * options.scale;
      canvas.height = 1280 * options.scale;
      let context = canvas.getContext('2d');
      context.fillStyle = options.backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (let component of components) {
        if (!component.canvas) {
          component.canvas = await html2canvas(this.components[component.id].$el, {
            ...options,
            windowWidth: component.getWindowWidth(),
          });
        }
        context.beginPath();
        context.drawImage(component.canvas,
          component.x * options.scale,
          component.y * options.scale,
          component.canvas.width,
          component.canvas.height,
        );
      }

      context.beginPath();
      context.lineWidth = 1.0 * options.scale;
      context.strokeStyle = 'rgb(255, 255, 255, 0.12)';
      context.moveTo(360 * options.scale, 0);
      context.lineTo(360 * options.scale, canvas.height);
      context.stroke();

      context.font = '24px Avenir';
      context.fillStyle = 'rgb(255, 255, 255, 0.7)';
      context.fillText('Generated by profile.unipjsk.com', 16 * options.scale, 1264 * options.scale);

      let link = document.createElement('a');
      link.setAttribute('download', 'profile.png');
      link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
      link.click();
    },
  },
  mounted() {
    this.$sekai.loadDatabase();
    this.$root.$on('saveComponent', (name, component) => {
      this.components[name] = component;
    });
    this.$root.$on('saveSummary', summary => {
      this.summary = summary;
    });
    this.$root.$on('print', () => {
      this.print();
    });
  }
};
</script>
