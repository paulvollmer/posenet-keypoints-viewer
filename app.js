import {drawPose} from './src/index';

/**
 * get the pose data form the textarea
 */
function getData() {
  const data = document.getElementById('data').value;
  return JSON.parse(data);
}

/**
 * render the pose to the canvas
 */
function render() {
  const data = getData();
  const canvas = document.getElementById('visualize');
  let ctx = canvas.getContext('2d');
  // draw the background
  ctx.fillStyle = '#ccc';
  ctx.fillRect(0, 0, 500, 500);
  // draw the pose
  drawPose(ctx, data.keypoints)
}

window.onload = function() {
  document.getElementById('btn-render').onclick = render;
  render();
};
