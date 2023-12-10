<template>
	<!--关于弹窗-->
	<el-dialog title="关于" width="600px" class="about-Eddie-wiki">
		<div class="about-content">
			<div class="doc-name">Eddie-wiki</div>
			<div class="doc-desc">
				<div class="slogan">知识库管理平台</div>
				<div>当前版本 {{ '1.0.0' }}</div>
				<div>
					版权所有 © 2018-2023
				</div>
			</div>
		</div>
	</el-dialog>
</template>

<script setup>

</script>

<style lang="scss">
.about-Eddie-wiki {
  text-align: left;
  line-height: normal;

  .el-dialog__body {
	padding: 20px;
  }

  .about-content {
	.doc-name {
	  font-weight: bold;
	  font-size: 25px;
	}

	.doc-desc {
	  line-height: 30px;
	  padding: 10px 0;

	  .slogan {
		margin-bottom: 30px;
	  }
	}
  }
}
</style>
