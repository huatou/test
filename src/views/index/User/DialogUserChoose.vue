<template>
    <el-dialog title="选择人员" :visible.sync="visible" top="10vh" width="900px">
        <div style="height: 300px;padding: 20px 0">
            <div class="float-left h-100 m-2" style="width: 48%;">
                <div style="margin-bottom: 6px;">
                    <span class="bold" style="line-height: 28px;font-size: 18px;color: black">待选人员列表</span>
                    <el-input v-model="queryModel.keyword" clearable style="width: 200px;float: right"
                              maxlength="40" prefix-icon="el-icon-search"
                              placeholder="请输入关键字搜索" size="mini"></el-input>
                </div>
                <div class="border h-100 p-2">
                    <el-checkbox v-for="item,index in userList" :key="index" :label="item.displayName"
                                 v-model="item.isChecked" style="margin-right: 10px;width: 30%">
                    </el-checkbox>
                </div>
            </div>
            <div class="float-left h-100 m-2" style="width: 48%;">
                <div style="margin-bottom: 6px;">
                    <span class="bold" style="line-height: 28px;font-size: 18px;color: black">已选人员列表</span>
                </div>
                <div class="border h-100 p-2">
                    <el-checkbox v-for="item,index in userList" :key="index" :label="item.displayName"
                                 v-model="item.isChecked" v-show="item.isChecked" style="margin-right: 10px;width: 30%">
                    </el-checkbox>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="submit()">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import BaseDialog from "../../../components/Dialog/BaseDialog";

    export default {
        name: "DialogUserChoose",
        extends: BaseDialog,
        data() {
            return {
                userList: []
            }
        },
        methods: {
            getData() {
                this.userList = [];
                this.request.axiosGetUser(this, {keyword: this.keyword}, (data) => {
                    data.forEach((user, index) => {
                        let item = this.jquery.extend({
                            label: user.displayName,
                            key: user.userId
                        }, user);
                        this.userList.push(item);
                    });
                });
            },
            submit() {
                let chosenList = [];
                chosenList = this.userList.filter(user => user.isChecked);
                if (chosenList.length != 0) {
                    this.close(chosenList);
                } else {
                    alert("请选择人员");
                }
            }
        }
    }
</script>

<style scoped>

</style>