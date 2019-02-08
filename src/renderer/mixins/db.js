import { jarTool } from '@/tools'
import { cmd } from '@/common'

export default {

	methods: {
		async connectDb () {
			try {
				this.isConnect = true
				await this.fetchDbInfo(this.model)
			} catch (e) {
				console.error(e)
				this.$Message['error']('获取数据库信息失败')
			} finally {
				this.isConnect = false
			}
		},
		async fetchDbInfo (dbVo) {
			let result = await jarTool.exec(cmd.GET_DB_INFO, dbVo.connectConfig)
			await this.$store.dispatch('addTable', {id: dbVo.id, data: result})
		}
	}

}
