import globalVars from './globalVariables';
import eraCheck from './yearEraCheck';
import Task from './task';
import { fakerEN, fakerDE, fakerYO_NG, fakerIT } from '@faker-js/faker';
const specs = globalVars['SPECIALTIES'];
const reqTypes = ['age', 'spec', 'sex', 'year'];

const generateTask = (difficulty) => {
  let additionalReqAmount = __generateAdditionalReqAmount(difficulty);
  let requirements = [];
  let remainingReqTypes = [...reqTypes];
  remainingReqTypes.splice(remainingReqTypes.indexOf('year'), 1);

  for (let i = 0; i < additionalReqAmount; i++) {
    let requirement = __generateReq(remainingReqTypes);
    if (requirement) {
      remainingReqTypes.splice(remainingReqTypes.indexOf(requirement[0]), 1);
      requirements.push(requirement);
    }
  }
  requirements.push([
    'year',
    __getRandomIntInclusive(globalVars['TIME_START'], globalVars['TIME_END']),
  ]);

  const taskDescription = __generateTaskDescription(requirements);
  const taskValue = __generateTaskValue(difficulty);
  const taskClues = __generateTaskClues(requirements);
  const task = new Task(
    taskDescription,
    requirements,
    difficulty,
    taskValue,
    taskClues,
  );
  return task;
};

function __generateTaskValue(difficulty) {
  return Math.round(5 + (1 / 10) * Math.pow(difficulty, 2));
}

function __generateTaskClues(requirements) {
  let taskClues = '';

  requirements.forEach((req) => {
    const value = req[1]; // The value is the second element of the requirement array
    switch (
      req[0] // req[0] is the type (e.g., 'age', 'spec', 'sex', 'year')
    ) {
      case 'year':
        const yearClues = [
          'This mission takes place in ' + eraCheck(value) + '. ',
          'Someone who has an expertise working around the year ' +
            eraCheck(value) +
            ' would be needed for this mission.',
          'An agent with experience working around the year ' +
            eraCheck(value) +
            ' would be preferred.',
        ];
        taskClues +=
          yearClues[__getRandomIntInclusive(0, yearClues.length - 1)];
        break;

      case 'age':
        const ageClues = [
          'The ideal agent for this mission would be around ' +
            value +
            ' years old. ',
          'We need an agent who is roughly ' +
            value +
            ' years old for this mission. ',
          'No one would bat an eyelid if the agent was around ' + value + '. ',
        ];
        taskClues += ageClues[__getRandomIntInclusive(0, ageClues.length - 1)];
        break;

      case 'spec':
        const specClues = [
          'A(n) ' + value + ' would be perfect for this. ',
          'Do we have any ' + value + 's on staff for this? ',
          'This mission should probably be assigned to a(n) ' +
            value +
            ' of some sort. ',
        ];
        taskClues +=
          specClues[__getRandomIntInclusive(0, specClues.length - 1)];
        break;

      case 'sex':
        const sexClues = [
          'This mission is to be done in a ' + value + '-only area. ',
          'A ' + value + ' would blend in perfectly in the crowd. ',
          value.charAt(0).toUpperCase() +
            value.slice(1) +
            's would be preferred. ',
        ];
        taskClues += sexClues[__getRandomIntInclusive(0, sexClues.length - 1)];
        break;
    }
  });

  return taskClues;
}

function __generateTaskDescription(requirements) {
  const targetName = __generateRandomNationalityName();
  const actions = {
    medic: [
      'Heal ' + targetName,
      'Cure ' + targetName + "'s amolastasis",
      'Bring ' + targetName + ' back to life',
    ],
    subterfugists: [
      'Blackmail ' + targetName,
      'Infiltrate ' + targetName + "'s compound",
      'Send ' + targetName + ' to ' + fakerEN.location.country(),
    ],
    killer: [
      'Make ' + targetName + "'s death look like an accident",
      'Assassinate ' + targetName,
      'Kill ' + targetName,
    ],
    engineer: [
      'Introduce cold fusion to the people of ' + fakerEN.location.country(),
      'Build a bridge from ' +
        fakerEN.location.country() +
        ' to ' +
        fakerEN.location.city(),
      'Hack ' + fakerEN.internet.displayName() + "'s computer",
    ],
    civilian: [
      'Serve ' + fakerEN.food.dish() + ' to ' + targetName,
      'Warn ' + targetName + ' about the coming paradox',
      'Walk through a door at the exact right time',
      'Perceive a butterfly',
      'Insult ' + targetName + ' as viciously as possible',
      'Become a street musician in ' + fakerEN.location.city(),
      'Hide ' + targetName + "'s toothbrush",
      'Make ' + targetName + ' hate spiders',
      'Make ' + targetName + ' learn English',
    ],
  };

  const purposes = [
    ' to forever alter history.',
    ' to crush ' + fakerEN.location.country() + ' once and for all.',
    ' to make my internet slightly faster.',
    ' so my kids would have a brighter future.',
    " because it's the right thing to do.",
    ' to make my company slightly more money.',
    ' because it would be funny.',
  ];

  let actionCategory = 'civilian';
  const specRequirement = requirements.find((req) => req[0] === 'spec');
  if (specRequirement) {
    const spec = specRequirement[1];
    actionCategory = spec;
  }

  const actionCategoryList = actions[actionCategory] || actions['civilian'];
  const selectedAction =
    actionCategoryList[
      __getRandomIntInclusive(0, actionCategoryList.length - 1)
    ];
  const selectedPurpose =
    purposes[__getRandomIntInclusive(0, purposes.length - 1)];
  return selectedAction + selectedPurpose;
}

function __generateRandomNationalityName() {
  const fakers = [fakerDE, fakerEN, fakerYO_NG, fakerIT];
  const faker = fakers[__getRandomIntInclusive(0, fakers.length - 1)];
  return faker.person.fullName();
}

function __generateAdditionalReqAmount(difficulty) {
  const twoProbsChance = difficulty * 2;
  const threeProbsChance = difficulty;
  const random = __getRandomIntInclusive(0, 100);
  if (random <= threeProbsChance) {
    return 3;
  } else if (random <= twoProbsChance) {
    return 2;
  } else return 1;
}

function __generateReq(remainingReqTypes) {
  const reqType =
    remainingReqTypes[__getRandomIntInclusive(0, remainingReqTypes.length - 1)];
  switch (reqType) {
    case 'age':
      return [
        'age',
        __getRandomIntInclusive(globalVars['MIN_AGE'], globalVars['MAX_AGE']),
      ];
    case 'spec':
      return ['spec', specs[__getRandomIntInclusive(0, specs.length - 1)]];
    case 'sex':
      return ['sex', ['male', 'female'][__getRandomIntInclusive(0, 1)]];
  }
}

function __getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

export default generateTask;
