<script setup lang="ts">
import GlobalBottom from "./components/GlobalBottom.vue";
import { RouterView } from "vue-router";
</script>

<template>
	<div class="h-[150px] w-[220px] flex flex-col items-center rounded-md">
		<h1
			class="flex justify-center text-lg font-semibold border-b-2 w-[100%] p-2"
		>
			<div>
				<span class="text-blue-600">G</span>
				<span class="text-red-600">o</span>
				<span class="text-yellow-600">o</span>
				<span class="text-blue-600">g</span>
				<span class="text-green-600">l</span>
				<span class="text-red-600">e</span
				><span class="text-blue-600"> Search Count</span>
			</div>
		</h1>
		<router-view class="flex-1"></router-view>
		<GlobalBottom></GlobalBottom>
	</div>
</template>
