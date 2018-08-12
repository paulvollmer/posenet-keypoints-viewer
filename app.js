import {validateData, renderToCanvas} from './src/index';

const Width = 500;
const Height = 500;
const Scale = 1;
const BackgroundColor = '#222';
const PointRadian = 3;
const PointColor = 'orange';
const SkeletonColor = '#3f51b5';


/**
 * @param {String} msg - The message
 */
function setMessage(msg) {
  document.getElementById('message').innerHTML = msg;
}

/**
 * Get the pose data form the textarea
 * @return {Array}
 */
function getData() {
  const data = document.getElementById('data').value;
  let dataParsed;
  try {
     dataParsed = JSON.parse(data);
     if (!validateData(dataParsed)) {
       setMessage('Data not valid');
     }
     setMessage('');
  } catch (err) {
    setMessage('Data not valid json');
  }
  return dataParsed;
}

/**
 * The main render to render all pose canvas to the DOM
 */
function render() {
  const poseList = getData();
  let innerHTML = '';
  for (let i = 0; i < poseList.length; i++) {
    innerHTML += '<p>Item: '+i+
    '</p> <canvas id="pose-'+i+'" width="500" height=500></canvas>';
  }
  document.getElementById('visualize').innerHTML = innerHTML;
  for (let i = 0; i < poseList.length; i++) {
    renderToCanvas('pose-'+i, poseList[i].keypoints, Width, Height,
    PointRadian, Scale, BackgroundColor, PointColor, SkeletonColor, 3);
  }
}

window.onload = () => {
  document.getElementById('btn-render').onclick = render;
  render();
};
