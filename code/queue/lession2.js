/*
  621. 任务调度器

  给定一个用字符数组表示的 CPU 需要执行的任务列表。其中包含使用大写的 A - Z 字母表示的26 种不同种类的任务。任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。CPU 在任何一个单位时间内都可以执行一个任务，或者在待命状态。

  然而，两个相同种类的任务之间必须有长度为 n 的冷却时间，因此至少有连续 n 个单位时间内 CPU 在执行不同的任务，或者在待命状态。

  你需要计算完成所有任务所需要的最短时间。

  示例 1：
    输入: tasks = ["A","A","A","B","B","B"], n = 2
    输出: 8
    执行顺序: A -> B -> (待命) -> A -> B -> (待命) -> A -> B.

  注：
    任务的总个数为 [1, 10000]。
    n 的取值范围为 [0, 100]。
*/

/*
  解题思路：
    0、参数判断：
    1、查看下面的几种方式
*/

export default (outerTasks, n) => {
  let tasks = [...outerTasks];

  // 参数验证
  if (!Array.isArray(tasks)) {
    throw TypeError('please transfer a array, thanks!');
  }

  let tasksLen = tasks.length;

  if (tasksLen < 1 || tasksLen > 10000) {
    throw RangeError('please transfer a tasks length between 1 to 10000, thanks!');
  }

  let strTasks = tasks.join("");
  if (strTasks.length !== tasksLen || /[^A-Z]+/.test(strTasks)) {
    throw TypeError('please transfer a tasks item val in A-Z, thanks!');
  }

  if (!Number.isInteger(n)) {
    throw TypeError('please transfer a integer, thanks!');
  }

  if (n < 0 || n > 100) {
    throw TypeError('please transfer a n between 0 to 100, thanks!');
  }

  // 存储CPU执行的任务
  let CPUTaskQueue = [];

  /**
   * 方式二：
   *  先按照相同任务重复次数降序，按冷却长度来选取不在本次队列中的人物，
   *  思路清晰，性能高，适用性低，无法满足所有情况
   *  有个弊端：如果任务重复次数相同，会先取前面满足冷却长度的人物，
   *    后续任务可能会只剩自己，无法达到最短时间
   */

  // 按照相同任务重复次数最多的降序排列
  /* tasks = tasks.sort().join('').match(/([A-Z])\1+|[A-Z]/g).sort((a, b) => b.length - a.length).join('').split('');

  while(tasks.length > 0) {

    if (CPUTaskQueue.length === 0) {

      CPUTaskQueue.push(tasks.shift());

      continue;
    }

    let task = new RegExp("[^" + CPUTaskQueue.slice(-n).join("") + "]").exec(tasks.join(""));

    if (task === null) {
      // 待命状态
      CPUTaskQueue.push("-");

      continue;
    }

    CPUTaskQueue.push(task[0]);

    tasks.splice(task.index, 1);
  }

  return CPUTaskQueue.length;
  */


  /**
   * 方式一:
   *  归类存储，从大往小找，每次都获取较大且不重复的任务，存储到字符串中，
   *  思路直接，性能稍差，适用性强，满足所有情况
   */

  let tasksJson = {}; // 对归类进行存储

  tasks.forEach((task) => {
    tasksJson[task] = tasksJson[task] ? tasksJson[task] + 1 : 1;
  });

  let taskKeys = Object.keys(tasksJson);

  while (taskKeys.length > 0) {

    let executeTaskQueue = [];

    for (let i = 0; i <= n; i++) {

      let executeTaskMax = 0,
        executeTaskKey,
        executeTaskIndex
      ;

      taskKeys.forEach((key, index) => {

        if (!executeTaskQueue.includes(key) && tasksJson[key] > executeTaskMax) {

          executeTaskMax = tasksJson[key];
          executeTaskKey = key;
          executeTaskIndex = index;
        }
      });

      if (executeTaskKey === undefined) {
        break;
      }

      executeTaskQueue.push(executeTaskKey);
      tasksJson[executeTaskKey]--;

      if (tasksJson[executeTaskKey] === 0) {

        taskKeys.splice(executeTaskIndex, 1);
      }
    }

    CPUTaskQueue = CPUTaskQueue.concat(executeTaskQueue.join('').padEnd(n + 1, '-').split(""));
  }

  // 边界处理，当后面没有任务时，不要出现冷却时间
  if (CPUTaskQueue[CPUTaskQueue.length - 1] === '-') {

    CPUTaskQueue = CPUTaskQueue.join("").replace(/-+$/g, '').split("");
  }

  return CPUTaskQueue.length;
}