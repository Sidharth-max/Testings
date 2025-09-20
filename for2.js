function leftSidePyramid(n) {
  for (let i = 1; i <= n; i++) {
    let line = '|*'.repeat(i);
    console.log(line);
  }
}

function rightSidePyramid(n) {
  for (let i = 1; i <= n; i++) {
    let line = ' '.repeat(n - i) + '*|'.repeat(i);
    console.log(line);
  }
}

const size = 5;
console.log('Left-sided pyramid:');
leftSidePyramid(size);

console.log('Right-sided pyramid:');
rightSidePyramid(size);
