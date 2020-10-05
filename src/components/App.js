import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Main from './Main';

/* Реализовать томагоччи на js.																									
Реализовать виртуального питомца.
  - Томагоччи - животное, которое отображается на экране и требует ухода.				- У него есть три основных характеристики: питание, общение, энергия.					- Каждая характеристика измеряется от 0 до 100.																- Каждые 10 секунд каждая характеристика уменьшается на 1.										- Если хотя бы одна характеристика находится ниже 20 в течение минуты, тамагоччи умирает.																									
- Пользователь может раз в 30 секунд покормить тамагоччи и увеличить его питание на 30.																									
- Пользователь может погладить томагоччи (кликнуть на него) и увеличить его общение на 30 раз в 30 секунд.																								- Томагоччи ложится спать самостоятельно на 1 минуту если его энергия ниже 30 и просыпается с восстановленной энергией.																			- Во время сна его нельзя кормить и гладить.																	- Томагоччи не может спать, если его питание и общение меньше 40.							- Если Томагоччи умирает, игра кончается.																			- Пользователь может начать новую игру при открытии страницы.									- Пользователь может поставить игру на паузу.																	- Опция новой игры недоступна до окончания предыдущей.												- Опция закончить игру отсутствует.																						- Пользователь легко понимает текущий статус Томагоччи: жив, мёртв, спит.			- Томагоччи отображается на экране в виде любого животного. При смене статуса изображение меняется или появляются дополнительные элементы.									- Пользователь легко может узнать, какие действия из покормить и погладить сейчас доступны.																									
- На экране всегда отображается таймер жизни Томагоччи.												- Пользователь уведомляется, если какие-то характеристики Томагоччи ниже 40. */

const App = () => {
  const [specifications, setSpecifications] = useState({
    feeding: 20,
    communicating: 100,
    energy: 100
  });

  const [petLiveState, setPetLiveState] = useState({
    isAlive: true,
    isSleeping: false,
    deathTimerStarted: false
  });

  useEffect(() => {
    console.log('isAlive useEffect: ', petLiveState.isAlive);
  }, [petLiveState.isAlive]);

	const getSpecifications = () => {
		return {
			feeding: specifications.feeding,
			communicating: specifications.communicating,
			energy: specifications.energy
		}
  };
  
  const decreaseSpecifications = () => {
    setSpecifications({
      feeding: specifications.feeding - 1,
      communicating: specifications.communicating - 1,
      energy: specifications.energy - 1
    });
  };
	
	const addFeeding = () => {
		let currentFeeding = specifications.feeding;
		currentFeeding = currentFeeding >= 70 ? 100 : currentFeeding += 30;
		setSpecifications({ feeding: currentFeeding });
	};

	const addCommunicating = () => {
		let currentCommunicating = specifications.communicating;
    currentCommunicating = (currentCommunicating >= 70
                              ? 100 : currentCommunicating += 30);
    setSpecifications({ communicating: currentCommunicating });
  };

  const addEnergy = () => {
    setSpecifications({ energy: 100 });
  };

  const tamagotchiDeath = () => {
    console.log('test');
    if ((specifications.feeding < 20 ||
        specifications.communicating < 20 ||
        specifications.energy < 20) &&
        petLiveState.isAlive &&
        !petLiveState.deathTimerStarted)
    {
      setPetLiveState({ deathTimerStarted: true });
      console.log('specification < 20');
      console.log('isAlive: ', petLiveState.isAlive);
      const timeoutID = setTimeout(
        () => {
          setPetLiveState(() => ({ isAlive: false }));
          console.log('isAlive: ', petLiveState.isAlive);
        }, 10 * 1000);
    };
  }
  
  return (
    <div className="App-container
                    p-0
                    d-flex
                    flex-column
                    container-fluid">
      <Header
        getSpecifications = { getSpecifications }
        decreaseSpecifications = { decreaseSpecifications }
        tamagotchiDeath = { tamagotchiDeath }
      />
      <Main />
    </div>
  );
}

export default App;