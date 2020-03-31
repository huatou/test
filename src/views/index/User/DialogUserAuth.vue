<template>
    <el-dialog title="权限配置" :visible.sync="visible" v-if="row" top="10vh">
        <el-form :model="row">
            <el-form-item label="用户" label-width="120px">
                <label style="line-height: 40px;" class="h3">{{row.displayName+'('+row.username+')'}}</label>
            </el-form-item>
            <div style="border: 1px solid #cccccc;border-bottom: none" v-loading="tableIsLoading">
                <div style="border-bottom: 1px solid #cccccc;padding: 10px"
                     v-for="(moduleItem,moduleItemIndex) in list"
                     :key="moduleItemIndex">
                    <label class="moduleNameLabel">{{moduleItem.name}}</label>
                    <el-checkbox v-if="!moduleItem.children || moduleItem.children.length == 0"
                                 v-for="(actionItem,actionItemIndex) in moduleItem.actionList"
                                 :label="actionItem.actionName"
                                 :key="actionItemIndex"
                                 value="true"
                                 v-model="actionItem.isChecked"></el-checkbox>
                    <div v-for="(moduleChildItem,moduleChildItemIndex) in moduleItem.children"
                         :key="moduleChildItemIndex">
                        <label class="moduleNameLabel"
                               style="font-size: 12px">>>{{moduleChildItem.name}}</label>
                        <el-checkbox
                                v-for="(childActionItem,childActionItemIndex) in moduleChildItem.actionList"
                                :label="childActionItem.actionName"
                                :key="childActionItemIndex"
                                v-model="childActionItem.isChecked"></el-checkbox>
                    </div>
                </div>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dismiss()">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
    </el-dialog>

</template>

<script>
    import BaseDialog from "../../../components/Dialog/BaseDialog";

    export default {
        name: "DialogUserAuth",
        extends: BaseDialog,
        methods: {
            getData() {
                let params = {userId: this.row.userId}
                this.request.axiosGetUser(this, params, (data) => {
                    if (data) {
                        this.jquery.extend(this.row, data);
                        this.getModuleList();
                    } else {
                        alert("获取用户权限失败")
                    }
                });
            },
            moduleActionListFilter(moduleList) {
                moduleList.forEach(moduleItem => {
                    if (!moduleItem.children || moduleItem.children.length == 0) {
                        //判断该模块下的操作权限用户是否存在
                        moduleItem.actionList.forEach(actionItem => {
                            //表示moduleActionList拥有符合提交的数据
                            let isExits = this.row.moduleActionList.some(moduleActionItem => moduleActionItem.moduleActionId == actionItem.moduleActionId);
                            actionItem.isChecked = isExits;
                        });
                    } else {
                        this.moduleActionListFilter(moduleItem.children);
                    }
                });
            },
            getModuleList() {
                this.list = [];
                this.request.axiosGetModuleList(this, (moduleList) => {
                    this.moduleActionListFilter(moduleList);
                    this.list = this.jquery.extend([], moduleList);
                });
            },
            submitModuleActionFilter(moduleList, moduleActionList) {
                moduleList.forEach((moduleItem) => {
                    if (!moduleItem.children || moduleItem.children.length == 0) {
                        //判断该模块下的操作权限用户是否存在
                        moduleItem.actionList.forEach(actionItem => {
                            if (actionItem.isChecked) {
                                moduleActionList.push(actionItem);
                            }
                        });
                    } else {
                        this.submitModuleActionFilter(moduleItem.children, moduleActionList);
                    }
                });
            },
            submit() {
                let moduleActionList = [];
                this.submitModuleActionFilter(this.list, moduleActionList);
                this.row.moduleActionList = this.jquery.extend([], moduleActionList);
                this.request.axiosUserAuthPost(this, this.row, (data) => {
                    this.close();
                });
            }
        }
    }
</script>

<style scoped>


    .moduleNameLabel {
        font-size: 16px;
        font-weight: bold;
        line-height: 30px;
        width: 168px;
        margin-bottom: 0;
    }


</style>