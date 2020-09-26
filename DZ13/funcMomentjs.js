const format = 'DD.MM.YYYY';
const curdate = moment();
const st = moment().startOf('y');
const differ = document.getElementById('differ');
differ.innerHTML = st.diff(curdate, 'w');

const validity = document.getElementById('valid');
validity.innerHTML = moment().isValid();

const startOne = document.getElementById('startOne');
startOne.innerHTML = curdate.startOf('w').format(format);

const endOne = document.getElementById('endOne');
endOne.innerHTML = curdate.endOf('w').format(format);

const manipulationOne = document.getElementById('manipOne');
manipOne.innerHTML = curdate.add(3, 'days').format(format);

const manipulationTwo = document.getElementById('manipTwo');
manipTwo.innerHTML = curdate.subtract(3,'d').subtract(5, 'y').format(format);

