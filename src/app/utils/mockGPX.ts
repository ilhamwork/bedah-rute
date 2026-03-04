// Generate a sample GPX file for testing
export function generateMockGPXFile(): File {
  const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Bedah Rute" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Sample Trail Run - Mount Bromo Circuit</name>
    <desc>A challenging trail running route around Mount Bromo</desc>
  </metadata>
  
  <wpt lat="-7.9425" lon="112.9533">
    <ele>2329</ele>
    <name>Start Point</name>
  </wpt>
  
  <wpt lat="-7.9300" lon="112.9600">
    <ele>2450</ele>
    <name>First Ridge</name>
  </wpt>
  
  <wpt lat="-7.9200" lon="112.9650">
    <ele>2650</ele>
    <name>Summit Viewpoint</name>
  </wpt>
  
  <wpt lat="-7.9150" lon="112.9550">
    <ele>2550</ele>
    <name>Descent Start</name>
  </wpt>
  
  <wpt lat="-7.9250" lon="112.9450">
    <ele>2380</ele>
    <name>Valley Floor</name>
  </wpt>
  
  <trk>
    <name>Mount Bromo Circuit</name>
    <type>trail_running</type>
    <trkseg>
      <trkpt lat="-7.9425" lon="112.9533">
        <ele>2329</ele>
      </trkpt>
      <trkpt lat="-7.9420" lon="112.9540">
        <ele>2335</ele>
      </trkpt>
      <trkpt lat="-7.9415" lon="112.9545">
        <ele>2342</ele>
      </trkpt>
      <trkpt lat="-7.9410" lon="112.9550">
        <ele>2350</ele>
      </trkpt>
      <trkpt lat="-7.9405" lon="112.9555">
        <ele>2360</ele>
      </trkpt>
      <trkpt lat="-7.9400" lon="112.9560">
        <ele>2370</ele>
      </trkpt>
      <trkpt lat="-7.9395" lon="112.9565">
        <ele>2380</ele>
      </trkpt>
      <trkpt lat="-7.9390" lon="112.9570">
        <ele>2390</ele>
      </trkpt>
      <trkpt lat="-7.9385" lon="112.9575">
        <ele>2398</ele>
      </trkpt>
      <trkpt lat="-7.9380" lon="112.9580">
        <ele>2405</ele>
      </trkpt>
      <trkpt lat="-7.9370" lon="112.9585">
        <ele>2412</ele>
      </trkpt>
      <trkpt lat="-7.9360" lon="112.9588">
        <ele>2420</ele>
      </trkpt>
      <trkpt lat="-7.9350" lon="112.9590">
        <ele>2428</ele>
      </trkpt>
      <trkpt lat="-7.9340" lon="112.9592">
        <ele>2435</ele>
      </trkpt>
      <trkpt lat="-7.9330" lon="112.9594">
        <ele>2442</ele>
      </trkpt>
      <trkpt lat="-7.9320" lon="112.9596">
        <ele>2448</ele>
      </trkpt>
      <trkpt lat="-7.9310" lon="112.9598">
        <ele>2452</ele>
      </trkpt>
      <trkpt lat="-7.9300" lon="112.9600">
        <ele>2450</ele>
      </trkpt>
      <trkpt lat="-7.9290" lon="112.9605">
        <ele>2460</ele>
      </trkpt>
      <trkpt lat="-7.9280" lon="112.9610">
        <ele>2475</ele>
      </trkpt>
      <trkpt lat="-7.9270" lon="112.9615">
        <ele>2495</ele>
      </trkpt>
      <trkpt lat="-7.9260" lon="112.9620">
        <ele>2520</ele>
      </trkpt>
      <trkpt lat="-7.9250" lon="112.9625">
        <ele>2548</ele>
      </trkpt>
      <trkpt lat="-7.9240" lon="112.9630">
        <ele>2580</ele>
      </trkpt>
      <trkpt lat="-7.9230" lon="112.9635">
        <ele>2605</ele>
      </trkpt>
      <trkpt lat="-7.9220" lon="112.9640">
        <ele>2625</ele>
      </trkpt>
      <trkpt lat="-7.9210" lon="112.9645">
        <ele>2640</ele>
      </trkpt>
      <trkpt lat="-7.9200" lon="112.9650">
        <ele>2650</ele>
      </trkpt>
      <trkpt lat="-7.9195" lon="112.9645">
        <ele>2648</ele>
      </trkpt>
      <trkpt lat="-7.9190" lon="112.9640">
        <ele>2645</ele>
      </trkpt>
      <trkpt lat="-7.9185" lon="112.9635">
        <ele>2642</ele>
      </trkpt>
      <trkpt lat="-7.9180" lon="112.9630">
        <ele>2638</ele>
      </trkpt>
      <trkpt lat="-7.9175" lon="112.9620">
        <ele>2630</ele>
      </trkpt>
      <trkpt lat="-7.9170" lon="112.9610">
        <ele>2620</ele>
      </trkpt>
      <trkpt lat="-7.9165" lon="112.9600">
        <ele>2608</ele>
      </trkpt>
      <trkpt lat="-7.9160" lon="112.9590">
        <ele>2595</ele>
      </trkpt>
      <trkpt lat="-7.9155" lon="112.9580">
        <ele>2580</ele>
      </trkpt>
      <trkpt lat="-7.9150" lon="112.9570">
        <ele>2565</ele>
      </trkpt>
      <trkpt lat="-7.9150" lon="112.9560">
        <ele>2555</ele>
      </trkpt>
      <trkpt lat="-7.9150" lon="112.9550">
        <ele>2550</ele>
      </trkpt>
      <trkpt lat="-7.9155" lon="112.9540">
        <ele>2535</ele>
      </trkpt>
      <trkpt lat="-7.9160" lon="112.9530">
        <ele>2518</ele>
      </trkpt>
      <trkpt lat="-7.9165" lon="112.9520">
        <ele>2500</ele>
      </trkpt>
      <trkpt lat="-7.9170" lon="112.9510">
        <ele>2485</ele>
      </trkpt>
      <trkpt lat="-7.9180" lon="112.9500">
        <ele>2468</ele>
      </trkpt>
      <trkpt lat="-7.9190" lon="112.9490">
        <ele>2452</ele>
      </trkpt>
      <trkpt lat="-7.9200" lon="112.9480">
        <ele>2438</ele>
      </trkpt>
      <trkpt lat="-7.9210" lon="112.9470">
        <ele>2425</ele>
      </trkpt>
      <trkpt lat="-7.9220" lon="112.9460">
        <ele>2410</ele>
      </trkpt>
      <trkpt lat="-7.9230" lon="112.9455">
        <ele>2398</ele>
      </trkpt>
      <trkpt lat="-7.9240" lon="112.9452">
        <ele>2388</ele>
      </trkpt>
      <trkpt lat="-7.9250" lon="112.9450">
        <ele>2380</ele>
      </trkpt>
      <trkpt lat="-7.9260" lon="112.9455">
        <ele>2375</ele>
      </trkpt>
      <trkpt lat="-7.9270" lon="112.9460">
        <ele>2368</ele>
      </trkpt>
      <trkpt lat="-7.9280" lon="112.9465">
        <ele>2360</ele>
      </trkpt>
      <trkpt lat="-7.9290" lon="112.9470">
        <ele>2355</ele>
      </trkpt>
      <trkpt lat="-7.9300" lon="112.9475">
        <ele>2348</ele>
      </trkpt>
      <trkpt lat="-7.9310" lon="112.9480">
        <ele>2342</ele>
      </trkpt>
      <trkpt lat="-7.9320" lon="112.9485">
        <ele>2338</ele>
      </trkpt>
      <trkpt lat="-7.9330" lon="112.9490">
        <ele>2335</ele>
      </trkpt>
      <trkpt lat="-7.9340" lon="112.9495">
        <ele>2332</ele>
      </trkpt>
      <trkpt lat="-7.9350" lon="112.9500">
        <ele>2330</ele>
      </trkpt>
      <trkpt lat="-7.9360" lon="112.9505">
        <ele>2328</ele>
      </trkpt>
      <trkpt lat="-7.9370" lon="112.9510">
        <ele>2327</ele>
      </trkpt>
      <trkpt lat="-7.9380" lon="112.9515">
        <ele>2326</ele>
      </trkpt>
      <trkpt lat="-7.9390" lon="112.9520">
        <ele>2326</ele>
      </trkpt>
      <trkpt lat="-7.9400" lon="112.9525">
        <ele>2327</ele>
      </trkpt>
      <trkpt lat="-7.9410" lon="112.9528">
        <ele>2328</ele>
      </trkpt>
      <trkpt lat="-7.9420" lon="112.9531">
        <ele>2329</ele>
      </trkpt>
      <trkpt lat="-7.9425" lon="112.9533">
        <ele>2329</ele>
      </trkpt>
    </trkseg>
  </trk>
</gpx>`;

  const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
  return new File([blob], 'sample-mount-bromo-circuit.gpx', {
    type: 'application/gpx+xml',
  });
}
