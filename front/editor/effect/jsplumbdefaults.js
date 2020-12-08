export default {
  anchor: ['Perimeter', {shape: 'Circle'}],
  connector: ['Straight', {gap: 10}],
  paintStyle: { stroke: 'rgb(255, 166, 102)', strokeWidth: 3 },
  maxConnections: -1,
  connectionOverlays: [
    [
      'Arrow',
      {
        location: 1,
        id: 'arrow'
      }
    ]
  ]
}