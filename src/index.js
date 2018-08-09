import * as posenet from '@tensorflow-models/posenet';

/**
 * Draw a point on a canvas
 */
export function drawPoint(ctx, x, y, r, color, scale = 1) {
  ctx.beginPath();
  ctx.arc(x*scale, y*scale, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draw pose keypoints onto a canvas
 */
export function drawKeypoints(ctx, keypoints, color, scale = 1) {
  keypoints.forEach((keypoint) => {
    drawPoint(ctx, keypoint.position.x, keypoint.position.y, 3, color, scale);
  });
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
export function drawSegment(ctx, [ax, ay], [bx, by], color, scale = 1) {
  ctx.beginPath();
  ctx.moveTo(ax*scale, ay*scale);
  ctx.lineTo(bx*scale, by*scale);
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
export function drawSkeleton(ctx, keypoints, color, scale = 1) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, 0.5);
  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(ctx,
      [keypoints[0].position.x, keypoints[0].position.y],
      [keypoints[1].position.x, keypoints[1].position.y],
      color, scale);
  });
}

/**
 * Draw the Keypoints and Skeleton
 */
export function drawPose(ctx, keypoints, colorPoints = 'red', colorSkeleton = '#3f51b5', scale = 1) {
  drawSkeleton(ctx, keypoints, colorSkeleton, scale);
  drawKeypoints(ctx, keypoints, colorPoints, scale);
}
