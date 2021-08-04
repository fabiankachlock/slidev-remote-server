import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
	interface State {
		test: string;
	}

	// provide typings for `this.$store`
	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
