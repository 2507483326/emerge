import { jarTool } from '@/tools'
import { cmd } from '@/common'

export default {

	methods: {
		async connectDb () {
			try {
				if (this.model.isDbLibrary) {
					this.isConnect = true
					let result = await jarTool.exec(cmd.GET_DB_INFO, this.model.connectConfig)
					await this.$store.dispatch('addTable', {id: this.model.id, data: result})
				}
			} catch (e) {
				console.error(e)
				this.$Message['error']('获取数据库信息失败')
			} finally {
				this.isConnect = false
			}
		}
	}

}
