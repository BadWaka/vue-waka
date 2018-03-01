/**
 * Vue 构造函数
 */
class Vue {

    constructor(options) {
        this._data = options.data;
        this.observer(this._data, options.render);
        this.proxy(options.data);
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

    /**
     * 代理数据，从 vm._data.xxx 代理至 vm.xxx
     * @param {obj} data
     */
    proxy(data) {
        const that = this;
        Object
            .keys(data)
            .forEach(key => {
                Object.defineProperty(that, key, {
                    configurable: true,
                    enumerable: true,
                    get: function proxyGetter() {
                        return that._data[key];
                    },
                    set: function proxySetter(val) {
                        return that._data[key] = val;
                    }
                });
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

// 添加了代理之后，就可以用 vm.text 代替 vm._data.text 了
vm.text += 1;
