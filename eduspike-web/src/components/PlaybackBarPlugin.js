export const playbackBarPlugin = {
  id: "playbackBar",
  getLinePosition: function (chart, pointIndex) {
      try {
      const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
      const data = meta.data;
      console.log(meta);
      return data[pointIndex].x;
      } catch (error) {
        return false
      }
  },

  renderVerticalLine: function (chartInstance, pointIndex) {
      const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
      if (lineLeftOffset){
        const scale = chartInstance.scales.y;
        const context = chartInstance.ctx;
        console.log("RUNNING PLUGIN FOR VERTICAL LINE")
        // render vertical line
        context.beginPath();
        context.strokeStyle = '#dec62c';
        context.lineWidth = 1.5;
        context.moveTo(lineLeftOffset, scale.top);
        context.lineTo(lineLeftOffset, scale.bottom);
        context.stroke();
      }  
  },

  afterDatasetsDraw: function (chart, easing) {
    chart.config._config.options.plugins.playbackBar.lineAtIndex.forEach(pointIndex => this.renderVerticalLine(chart, pointIndex));
  }
};