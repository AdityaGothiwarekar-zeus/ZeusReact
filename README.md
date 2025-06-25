The issue is that the direct cell editing input is positioned as position: 'fixed', which positions it relative to the viewport instead of relative to the canvas. When you scroll or the layout changes, the input can end up covering the navbar or appearing in the wrong position.
Here's the fix - change the positioning from fixed to absolute:
Find this part in your code (around line 580-600):
style={{
  position: 'fixed',
  left: editPosition.x,
  top: editPosition.y,
  width: COL_WIDTH - 2,
  height: ROW_HEIGHT - 2,
  border: '2px solid #107c41',
  outline: 'none',
  padding: '0 4px',
  fontSize: '14px',
  fontFamily: fontFamily,
  zIndex: 1000,
  background: 'white'
}}


style={{
  position: 'absolute',
  left: editPosition.x,
  top: editPosition.y,
  width: COL_WIDTH - 2,
  height: ROW_HEIGHT - 2,
  border: '2px solid #107c41',
  outline: 'none',
  padding: '0 4px',
  fontSize: '14px',
  fontFamily: fontFamily,
  zIndex: 1000,
  background: 'white'
}}



Also, you need to update the startEditing function to calculate relative positions instead of absolute viewport positions. Find this part (around line 150-170):


const startEditing = useCallback((row, col) => {
  const { startRow } = getVisibleRowRange();
  const canvasRect = canvasRef.current?.getBoundingClientRect();
  if (!canvasRect) return;

  const x = canvasRect.left + ROW_HEADER_WIDTH + col * COL_WIDTH;
  const y = canvasRect.top + COL_HEADER_HEIGHT + ((row - startRow) * ROW_HEIGHT);

Replace it with:


const startEditing = useCallback((row, col) => {
  const { startRow } = getVisibleRowRange();

  const x = ROW_HEADER_WIDTH + col * COL_WIDTH;
  const y = COL_HEADER_HEIGHT + ((row - startRow) * ROW_HEIGHT);
