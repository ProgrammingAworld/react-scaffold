/**
 *
 * Created by wuyuliang on 16/6/6.
 */
export default class Topologic {
    /**
     * 计算拓扑序结构，用于返回给定节点的上游节点
     * @param {Array<Object>} nodes -所有节点的数组
     * @param {Array<String>} nodeIds -需要求拓扑图的节点id
     * @return {Array<String>} -返回类型类似输入参数的结构,是具体的拓扑序
     */
    static topologicalSort(nodes, nodeIds) {
        var flag = new Set(); //标记某个节点是否访问过
        var res = new Set(); //结果队列

        function deepIn(nodeId) {
            if (res.has(nodeId)) return; //如果节点已经加入到结果队列
            if (flag.has(nodeId)) throw new Error("LoopFound"); //如果进入节点依赖后还能回到此节点,则说明有环

            var node = nodes.filter( function(node){ return node.id == nodeId}).shift();
            if (node == undefined) return;
            var dependencies = node.dependencies;
            flag.add(nodeId); //进入节点依赖前先标记
            for (var deOpId in dependencies)
                deepIn(dependencies[deOpId]);
            res.add(nodeId); //退出节点依赖时加入结果队列
        }

        for (var index in nodeIds) {
            deepIn(nodeIds[index]);
        }
        return Array.from(res);
    }

    static isConnect(currentVersion, deOpId, opId) {
        var nodes = currentVersion.meta.vars;
        var node = nodes.filter( function(node){ return node.id == opId}).shift();
        if (node == undefined || node.dependencies.indexOf(deOpId) >= 0){
            return false;
        }

        var queue = Topologic.topologicalSort(nodes, [deOpId]);
        if (queue.indexOf(opId) >= 0){
            return false;
        } else {
            return true;
        }
    }

    static addNodesToQueue(currentVersion, opIds) {
        var nodes = currentVersion.meta.vars;
        var queue = Topologic.topologicalSort(nodes, opIds);
        var resQueue = currentVersion.meta.queue;
        for (var queueId in queue){
            if (resQueue.indexOf(queue[queueId]) < 0)
                resQueue.push(queue[queueId]);
        }
        return resQueue;
    }

    static adjustNodeInQueue(currentVersion, opId, from, to) {
        var nodes = currentVersion.meta.vars;
        var queue = currentVersion.meta.queue;

        if (to < 0) to = 0;
        if (to >= queue.length) to = queue.length - 1;
        if (queue.indexOf(opId) == from) {
            var node = nodes.filter( function(node){ return node.id == opId}).shift();
            if (node != undefined) {
                var enable = false;
                if (from > to) {
                    var queueDep = queue.slice(to, from);
                    enable = (queueDep.filter(function (id) {
                            return node.dependencies.indexOf(id) >= 0;
                        })).length <= 0;

                } else {
                    var queueDep = queue.slice(from + 1, to + 1);
                    enable = (queueDep.filter(function(id) {
                        var nowNode = nodes.filter(function(node){return node.id == id}).shift();
                        return nowNode.dependencies.indexOf(opId) >= 0;
                    })).length <= 0;
                }
                if (enable) {
                    var removedElement = queue.splice(from, 1)[0];
                    queue.splice(to, 0, removedElement);
                }
            }
        }
        return queue;
    }
}

