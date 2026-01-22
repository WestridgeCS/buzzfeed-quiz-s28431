import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  res.render('quiz', {
    title: 'what color are you?',
    step: 1,
    state: {},
    outcome: null
  });
});

// One route handles all choices
// One route handles all choices
router.post('/quiz', (req, res) => {
  const body = req.body || {};

  // state carried forward via hidden fields
  const state = {
    q1: body.q1 || '',
    q2: body.q2 || '',
    q3: body.q3 || '',
    q4: body.q4 || ''
  };

  // Figure out the current step:
  // Step 1: starter not chosen
  // Step 2: starter chosen, but path not chosen
  // Step 3: both chosen => outcome
  let step = 1;
  if (state.q1 && !state.q2 && !state.q3 && !state.q4) step = 2;
  if (state.q1 && state.q2 && !state.q3 && !state.q4) step = 3;
  if (state.q1 && state.q2 && state.q3 && !state.q4) step = 4;
  if (state.q1 && state.q2 && state.q3 && state.q4) step = 5;

  // TODO 2: Create multiple outcomes based on starter + path
  // outcome should be an object: { heading: '...', text: '...' }
  let outcome = null;

  if (step === 5) {
    outcome = getOutcome(state);
  }

  res.render('quiz', {
    title: 'what color are you?',
    step,
    state,
    outcome
  });
});

// TODO 3: Add at least 4 different endings
function getOutcome({q1,q2,q3,q4}) {
  let q1int = parseInt(q1);
  let q2int = parseInt(q2);
  let q3int = parseInt(q3);
  let q4int = parseInt(q4);
  let qtotal = q1int+q2int+q3int+q4int;
  if (qtotal===3  || qtotal===4) {
    return {
      heading: 'your color is RED!',
      text: 'RED !!!'
    };
  }
  if (qtotal===5) {
    return {
      heading: 'your color is CORAL',
      text: 'CORAL!!'
    };
  }
  if (qtotal===6) {
    return {
      heading: 'your color is ORANGE',
      text: 'ORANGE!!'
    };
  }
  if (qtotal===7 || qtotal===8) {
    return {
      heading: 'your color is YELLOW',
      text: 'YELLOWWW'
    };
  }
  if (qtotal===9 || qtotal===10 || qtotal===11) {
    return {
      heading: 'your color is PINK',
      text: 'pink :3'
    };
  }

  if (qtotal===12 || qtotal===13 || qtotal===14) {
    return {
      heading: 'your color is TEAL or GREEN',
      text: 'teal or green are pretty COOL colors >:3.'
    };
  }
  if (qtotal===15 || qtotal===16) {
    return {
      heading: 'your color is BLUE',
      text: 'blue.'
    };
  }
  if (qtotal===17) {
    return {
      heading: 'your color is PURPLE',
      text: 'PURPLE'
    };
  }
  // Default ending
  return {
    heading: 'you are nothing',
    text: 'colorless 3:',
  };
}



