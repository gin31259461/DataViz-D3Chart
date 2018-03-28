```js
let data = [{
    cat: 'library',
    name: 'D3',
    value: 30
    }, {
        cat: 'library',
        name: 'Raphaël',
        value: 10
    }, {
        cat: 'library',
        name: 'Relay',
        value: 70
    }, {
        cat: 'library',
        name: 'Three.js',
        value: 40
    }, {
        cat: 'library sub',
        name: 'Lodash',
        value: 30
    }, {
        cat: 'library sub',
        name: 'Moment JS',
        value: 30
    }, {
        cat: 'library sub',
        name: 'Numeral.js',
        value: 20
    }, {
        cat: 'library sub',
        name: 'Redux',
        value: 80
    }, {
        cat: 'framework',
        name: 'Angular 2.0',
        value: 30
    }, {
        cat: 'framework',
        name: 'Bootstrap CSS',
        value: 50
    }, {
        cat: 'framework',
        name: 'Ember JS',
        value: 10
    }, {
        cat: 'framework',
        name: 'ExpressJS',
        value: 30
    }, {
        cat: 'framework',
        name: 'Hexo',
        value: 50
    }, {
        cat: 'framework',
        name: 'ReactJS',
        value: 300
    }, {
        cat: 'tooling',
        name: 'Atom',
        value: 10
    }, {
        cat: 'tooling',
        name: 'Google Chrome & Devtool',
        value: 70
    }, {
        cat: 'tooling',
        name: 'Jenkins CI',
        value: 30
    }, {
        cat: 'tooling',
        name: 'Sublime Text 3',
        value: 100
    }, {
        cat: 'tooling',
        name: 'Visual Studio Code',
        value: 50
    }, {
        cat: 'tooling',
        name: 'Performance Tooling',
        value: 30
    }, {
        cat: 'tooling',
        name: 'Yeoman generator for Nau Workflow',
        value: 20
    }, {
        cat: 'tooling',
        name: 'live-server',
        value: 30
    }, {
        cat: 'tooling',
        name: 'PostCSS',
        value: 30
    }, {
        cat: 'backend',
        name: 'Elastic Search',
        value: 10
    }, {
        cat: 'backend',
        name: 'Keystone CMS',
        value: 50
    }, {
        cat: 'backend',
        name: 'KoaJS',
        value: 10
    }, {
        cat: 'backend',
        name: 'Loopback',
        value: 30
    }, {
        cat: 'backend',
        name: 'Restify',
        value: 20
    }, {
        cat: 'backend',
        name: 'MongoDB',
        value: 70
    }, {
        cat: 'backend',
        name: 'NodeJS',
        value: 100
    }, {
        cat: 'platform',
        name: 'Docker Platform',
        value: 10
    }, {
        cat: 'platform',
        name: 'MeteorJS',
        value: 80
    }, {
        cat: 'platform',
        name: 'Phonegap',
        value: 50
    }, {
        cat: 'platform',
        name: 'Reaction Commerce',
        value: 20

    }, {
        cat: 'platform',
        name: 'ReactNative',
        value: 10

    }, {
        cat: 'platform',
        name: 'SquareSpace',
        value: 30

    }, {
        cat: 'language',
        name: 'HTML5 & CSS3',
        value: 100
    }, {
        cat: 'language',
        name: 'JavaScript',
        value: 100
    }, {
        cat: 'language',
        name: 'CSS Next',
        value: 10
    }, {
        cat: 'language',
        name: 'GraphQL',
        value: 50

    }, {
        cat: 'language',
        name: 'LESS CSS',
        value: 20,
    }];

    <Bubblechart 
        data={data}
        width={300}
        height={300}
        gettip={(d)=>`${d.name}\n ${d.value}`}
        getcolor={d=>d.cat}
        marginright={150}
      ></Bubblechart>




```