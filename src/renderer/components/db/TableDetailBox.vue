<template>
	<div class="table_detail_box">
		<custom-tag-box></custom-tag-box>
		<div class="field_box">
			<div class="fixed_wrapper">
				<Card class="list_box" :key="item.tableId" v-for="(item, index) in table.columns">
					<div class="top_box">
						<div class="name">{{ item.lowCaseName }}</div>
						<div class="tag_list_box" @drop="dropCustomTag($event, item)" @dragover="dragCustomTagOver">
							<Tag type="dot" size="medium" :key="tagItem.name" v-for="tagItem in getTagList(item)" @on-close="deleteTag(tagItem.id)" :color="tagItem.color" :closable="tagItem.closable">{{ tagItem.name }}</Tag>
						</div>
					</div>
					<div class="remark">{{item.remark}}</div>
				</Card>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomTagBox from './CustomTagBox'
	import TableCustomTag from "@/model/TableCustomTag"
	import clone from 'clone'
	import { getTagByKey } from '@/util/DefaultTagUtil'
	export default {
		components: {
			CustomTagBox
		},
		props: {
			dbId: {
				type: [Number, String],
				default: null
			},
			table: {
				type: Object,
				default: null
			}
		},
		computed: {
			customTagList () {
				return clone(this.$store.state.db.tableExtendTagList).filter(item => {
					return item.dbId === this.dbId && item.tableId === this.table.tableId
				})
			}
		},
		methods: {
			getTagList (fieldObj) {
				const initTagList = []
				if (fieldObj.isPrimary) {
					initTagList.push(getTagByKey('primary'))
				}
				if (!fieldObj.isNull) {
					initTagList.push(getTagByKey('notNull'))
				}
				initTagList.push(getTagByKey(this.getTagType(fieldObj.type)))
				this.customTagList.forEach(item => {
					if (item.columnId === fieldObj.columnId) {
						initTagList.push(item)
					}
				})
				return initTagList
			},
			async dropCustomTag (event, field) {
				try {
					const customTag = JSON.parse(event.dataTransfer.getData("customTag"))
					if (customTag === '') {
						return
					}
					await this.$store.dispatch('addTableCustomTag', new TableCustomTag({
						dbId: this.dbId,
						tableId: this.table.tableId,
						columnId: field.columnId,
						name: customTag.name,
						key: customTag.key,
						color: customTag.color
					}))
				} catch (e) {
					console.error(e)
					this.$Message.error(e)
				}
			},
			dragCustomTagOver (event) {
				event.preventDefault()
			},
			getTagType (type) {
				if (type === 'String') {
					return 'string'
				}
				if (type === 'Number') {
					return 'number'
				}
				if (type === 'Date') {
					return 'date'
				}
			},
			deleteTag (tagId) {
				this.$store.dispatch('removeTableCustomTag', tagId)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.table_detail_box
		display flex
		flex-direction column
		height 100%
		transform translate(0, 0)
		.field_box
			flex 1
			overflow-y auto
			.fixed_wrapper
				margin 20px
		.list_box
			margin-bottom 20px
			.top_box
				padding-bottom 10px
				display flex
				.name
					display flex
					align-items center
					justify-content center
				.tag_list_box
					flex 1
					padding 0 20px
			.remark
				padding-top 10px
				line-height 20px
				font-size 14px
				border-top 1px solid #e8eaec
</style>
