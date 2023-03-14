<template>
	<div class="flex flex-col items-center p-2 gap-2">
		<div class="text-base text-blue-600">
			You've searched
			<span class="font-semibold text-red-600">{{ count }}</span> times
		</div>
		<button
			@click="clearCount"
			class="bg-blue-600 font-semibold text-white p-1 rounded-md"
		>
			Clear Count
		</button>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { send } from "../../message";

const count = ref(0);
onMounted(() => {
	send<"getCount">({ type: "getCount" }, (res) => {
		count.value = res;
	});
});

const clearCount = () => {
	send<"clearCount">({ type: "clearCount" });
	count.value = 0;
};
</script>

<style scoped></style>
