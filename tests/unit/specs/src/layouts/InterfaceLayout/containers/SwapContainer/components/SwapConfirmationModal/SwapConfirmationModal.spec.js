import { shallowMount } from '@vue/test-utils';
import SwapConfirmationModal from '@/layouts/InterfaceLayout/containers/SwapContainer/components/SwapConfirmationModal/SwapConfirmationModal.vue';
import { Tooling } from '@@/helpers';

const RouterLinkStub = {
  name: 'router-link',
  template: '<p> <slot> </slot></p>',
  props: ['to']
};

describe('SwapConfirmationModal.vue', () => {
  let localVue, i18n, wrapper, store;
  beforeAll(() => {
    const baseSetup = Tooling.createLocalVueInstance();
    localVue = baseSetup.localVue;
    i18n = baseSetup.i18n;
    store = baseSetup.store;
  });

  beforeEach(() => {
    wrapper = shallowMount(SwapConfirmationModal, {
      localVue,
      i18n,
      store,
      attachToDocument: true,
      stubs: {
        'router-link': RouterLinkStub
      }
    });
  });

  xit('[FAILING] should render correct fromArray to currenPicker element', () => {
    wrapper.find('.detail-information input').trigger('click');
    expect(wrapper.find('.detail-information .expending-block').exists()).toBe(
      true
    );

    const liElements = wrapper.vm.$el.querySelectorAll(
      '.detail-information .expending-block li'
    );
    for (let i = 0; i < liElements.length; i++) {
      const liElement = liElements[i];
      const detailInfo = wrapper.vm.$data.detailInfo[i];
      expect(liElement.querySelector('p.name').textContent.trim()).toEqual(
        detailInfo.name
      );
      expect(liElement.querySelector('p.value').textContent.trim()).toEqual(
        detailInfo.value
      );
    }
  });
  describe('SwapConfirmationModal.vue Methods', () => {});
});
