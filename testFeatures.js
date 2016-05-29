module.exports = [
  {
    name : 'Feature 1',
    description : 'My First Feature',
    uri : 'feature1.feature',
    elements : [
      {
        name : 'How Do Scenarios Work',
        line : 3,
        tags : [{ name : '@wip' }],
        steps : [
          {
            keyword : 'Given',
            name : 'I have no idea what I am doing',
            result : {
              status : 'skipped'
            }
          }
        ]
      },
      {
        name : 'Scenarios Are Cool',
        line : 6,
        tags : [{ name : '@dip' }],
        steps : [
          {
            keyword : 'Given',
            name : 'I want to learn',
            result : {
              status : 'pending'
            }
          }
        ]
      }
    ]
  },
  {
    name : 'Feature 2',
    description : 'My Second Feature',
    uri : 'feature2.feature',
    elements : [
      {
        name : 'I can test anything with automation',
        line : 3,
        tags : [{ name : '@flip' }],
        steps : [
          {
            keyword : 'Given',
            name : 'I am learning',
            result : {
              status : 'failed'
            }
          }
        ]
      },
      {
        name : 'Beep Boop Bop',
        line : 6,
        tags : [{ name : '@binary' }],
        steps : [
          {
            keyword : 'Given',
            name : 'I am a Pro',
            result : {
              status : 'passed'
            }
          },
          {
            keyword : 'When',
            name : 'I act like a Pro',
            result : {
              status : 'passed'
            }
          },
          {
            keyword : 'Then',
            name : 'I am treated like a Rockstart',
            result : {
              status : 'passed'
            }
          }
        ]
      }
    ]
  }
];