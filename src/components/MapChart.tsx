'use client';

import { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default function MapChart() {
  useLayoutEffect(() => {
    const root = am5.Root.new("chartdiv");
    
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator()
      })
    );

    // Countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"] // exclude Antarctica
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0x334155),
      stroke: am5.color(0x0f172a),
      strokeWidth: 1,
      tooltipText: "{name}",
      interactive: true
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0xA875FF) // purple highlight
    });

    // Hubs/Points
    const pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {})
    );

    pointSeries.bullets.push(function() {
      const circle = am5.Circle.new(root, {
        radius: 5,
        fill: am5.color(0xf1c40f),
        tooltipText: "{title}"
      });
      return am5.Bullet.new(root, {
        sprite: circle
      });
    });

    // Lines (Paths to Saudi Arabia)
    const lineSeries = chart.series.push(
      am5map.MapLineSeries.new(root, {})
    );

    lineSeries.mapLines.template.setAll({
      stroke: am5.color(0xf1c40f),
      strokeWidth: 2,
      strokeOpacity: 0.8,
      strokeDasharray: [4, 4]
    });

    // Data
    const saudi = { longitude: 45.0792, latitude: 23.8859, title: "Saudi Arabia (HQ)" };
    const usa = { longitude: -95.7129, latitude: 37.0902, title: "Americas Hub" };
    const europe = { longitude: 10.4515, latitude: 51.1657, title: "Europe Hub" };
    const asia = { longitude: 104.1954, latitude: 35.8617, title: "Asia Hub" };
    const africa = { longitude: 22.9375, latitude: -30.5595, title: "Africa Hub" };

    pointSeries.data.setAll([saudi, usa, europe, asia, africa]);

    lineSeries.data.setAll([
      { geometry: { type: "LineString", coordinates: [[usa.longitude, usa.latitude], [saudi.longitude, saudi.latitude]] } },
      { geometry: { type: "LineString", coordinates: [[europe.longitude, europe.latitude], [saudi.longitude, saudi.latitude]] } },
      { geometry: { type: "LineString", coordinates: [[asia.longitude, asia.latitude], [saudi.longitude, saudi.latitude]] } },
      { geometry: { type: "LineString", coordinates: [[africa.longitude, africa.latitude], [saudi.longitude, saudi.latitude]] } }
    ]);

    // Add animating plane/dot along the lines
    lineSeries.bullets.push(function() {
      const container = am5.Container.new(root, {});
      container.children.push(
        am5.Circle.new(root, {
          radius: 3,
          fill: am5.color(0xffffff)
        })
      );
      
      // @ts-ignore
      container.events.on("dataitemvalidated", function(ev) {
        // @ts-ignore
        const dataItem = ev.dataItem;
        const mapLine = dataItem.get("mapLine");
        if (mapLine) {
          am5.array.each(mapLine.get("points"), function(point) {
            (container as any).animate({
              key: "positionOnLine",
              to: 1,
              from: 0,
              duration: 3000,
              loops: Infinity,
              easing: am5.ease.linear
            });
          });
        }
      });

      return am5.Bullet.new(root, {
        sprite: container
      });
    });

    // Zoom in slightly to fit nicely
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: '100%', height: '100%' }}></div>;
}
