class TreeStore {
  constructor(array) {
    this.array = array
  }
  getAll() {
    // Должен возвращать изначальный массив элементов
    console.log('getAll', this.array)
    return this.array
  }
  getItem(id) {
    //Принимает id элемента и возвращает сам объект элемента
    const foundValue = this.array.find(item => {
      return +item.id === +id
    })
    return foundValue
  }
  getChildren(id) {
    const result = this.array.filter(item => {
      return +item.parent === +id
    })
    return result
  }
  getAllChildren(id) {
    const children1 = this.getChildren(id)
    const children2 = []
    for (let item of children1) {
      const temp = this.getChildren(item.id)
      children2.push(...temp)
    }
    children1.push(...children2)
    return children1
  }
  getAllParents(id) {
    const result = []
    let parentID = this.getItem(id).parent

    while (parentID !='root') {
      result.push(this.getItem(parentID))
      parentID = this.getItem(parentID).parent
    }
    return result
  }
}

const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },

  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];
const ts = new TreeStore(items);

// Примеры использования:
ts.getAll() // [{"id":1,"parent":"root"},{"id":2,"parent":1,"type":"test"},{"id":3,"parent":1,"type":"test"},{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
console.log(ts.getItem(7)); // {"id":7,"parent":4,"type":null}
console.log(ts.getChildren(4)) // [{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
console.log(ts.getChildren(5)) // []
console.log(ts.getChildren(2)) // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"}]
console.log(ts.getAllChildren(2)); // [{"id":4,"parent":2,"type":"test"},{"id":5,"parent":2,"type":"test"},{"id":6,"parent":2,"type":"test"},{"id":7,"parent":4,"type":null},{"id":8,"parent":4,"type":null}]
console.log(ts.getAllParents(7)); // [{"id":4,"parent":2,"type":"test"},{"id":2,"parent":1,"type":"test"},{"id":1,"parent":"root"}]

// ТЗ: https://docs.google.com/forms/d/e/1FAIpQLScLO5TuyHOpe1HhxhHKIlLDgmcICJYwJD-KKJnelU-xSlhB4Q/viewform

// методы класса:
// getChildren(id)
// Принимает id элемента и возвращает массив элементов, являющихся дочерними для того элемента,
// чей id получен в аргументе. Если у элемента нет дочерних, то должен возвращаться пустой массив

// getAllChildren(id)
// Принимает id элемента и возвращает массив элементов, являющихся прямыми дочерними элементами того,
// чей id получен в аргументе + если у них в свою очередь есть еще дочерние элементы, они все тоже будут включены в результат,
// и так до самого глубокого уровня

// getAllParents(id)
// Принимает id элемента и возвращает массив из цепочки родительских элементов,
// начиная от самого элемента, чей id был передан в аргументе и до корневого элемента,
// т.е. должен получиться путь элемента наверх дерева через цепочку родителей к корню дерева.
// в результате getAllParents ПОРЯДОК ЭЛЕМЕНТОВ ВАЖЕН!
