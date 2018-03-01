/**
 * Vue 构造函数
 */
class Vue {

    constructor(options) {
        this._data = options.data;
        this.observer(this._data, options.render);
    }

    /**
     * 将数据设置为 observable
     * @param {obj} obj
     * @param {function} cb
     */
    observer(obj, cb) {
        const that = this;
        // 遍历对象的所有 key
        Object.keys(obj)
        // 对每个 key 进行响应式处理
            .forEach(key => {
            that.defineReactive(obj, key, obj[key], cb);
        });
    }

    /**
     * 响应式处理
     * @param {object} obj
     * @param {string} key
     * @param {*} val
     * @param {function} cb
     */
    defineReactive(obj, key, val, cb) {
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {},
            set(newVal) {
                cb();
            }
        });
    }
}

// vue 实例
const vm = new Vue({
    el: '#app',
    data: {
        text: 'text',
        text2: 'text2'
    },
    render() {
        console.log('render');
    }
});

// 需要用 vm._data.xxx 才能触发 set 方法
vm._data.text += 1;
