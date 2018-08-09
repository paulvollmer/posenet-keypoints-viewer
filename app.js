/**
 * get the pose data form the textarea
 */
function getData() {
  const data = document.getElementById('data').value;
  return JSON.parse(data);
}

/**
 *
 */
function drawPoint(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draw pose keypoints onto a canvas
 */
function drawKeypoints(ctx, keypoints, color) {
  keypoints.forEach((keypoint) => {
    drawPoint(ctx, keypoint.position.x, keypoint.position.y, 3, color);
  });
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
function drawSegment(ctx, [ax, ay], [bx, by], color) {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
function drawSkeleton(ctx, keypoints, color) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, 0.5);
  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(ctx,
      [keypoints[0].position.x, keypoints[0].position.y],
      [keypoints[1].position.x, keypoints[1].position.y],
      color);
  });
}

function renderCanvas(id, data) {
  let canvas = document.getElementById(id);
  let ctx = canvas.getContext('2d');
  // draw the background
  ctx.fillStyle = '#ccc';
  ctx.fillRect(0, 0, 500, 500);
  // draw the points and joints
  drawKeypoints(ctx, data.keypoints, 'red');
  drawSkeleton(ctx, data.keypoints, 'green');
}

function render() {
  const data = getData();
  renderCanvas('visualize', data);
}

window.onload = function() {
  document.getElementById('btn-render').onclick = render;
  render();
};
