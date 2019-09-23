<template>
    <div id="userBox">
        <SimpleTable module="action" :table-config="tableConfig" :actions="actions"/>
    </div>
</template>

<script>
    import SimpleTable from "../../components/SimpleTable";

    export default {
        components: {SimpleTable},
        data() {
            return {
                tableConfig: [
                    {
                        label: "序号",
                        prop: "sort"
                    },
                    {
                        label: "操作名",
                        prop: "actionName"
                    },
                    {
                        label: "识别码",
                        prop: "code"
                    },
                    {
                        label: "创建时间",
                        prop: "createTime",
                        unEditable: true
                    },
                    {
                        label: "创建人",
                        prop: "creatorName",
                        unEditable: true
                    },
                    {
                        label: "最后修改人",
                        prop: "updaterName",
                        unEditable: true
                    },
                    {
                        label: "最后修改时间",
                        prop: "updateTime",
                        unEditable: true
                    }
                ],
                actions: {
                    add: true,
                    edit: true,
                    delete: true
                }
            }
        }
    }

</script>

<style scoped>

</style>