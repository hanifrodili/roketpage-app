<template lang="pug">
p.mx-auto(:id="data._uid" title="paragraph" style="text-align:justify; max-width:50rem; letter-spacing:-0.03em" :style="{fontFamily:css?.font.family, fontSize:css?.font.size,fontWeight:css?.font.weight, color:css?.font.color}" :contenteditable="editable") {{ content }}
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const content = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium nemo laborum a minus, iusto iure ullam eaque quia neque recusandae necessitatibus reiciendis nihil, omnis voluptates eum, distinctio et? Ut voluptatum vel eligendi? Ipsum at et eaque commodi quae sapiente, possimus voluptate consequatur ipsa temporibus expedita minima soluta itaque nostrum placeat exercitationem! Delectus a rem esse necessitatibus quae, consectetur unde sit quo dignissimos iusto officiis magni porro distinctio repellat temporibus rerum vero quos vel molestias cum provident? Quibusdam nam quos nisi assumenda hic beatae tempore blanditiis, dolorem mollitia in vitae perspiciatis sapiente? Ipsum libero a, aut suscipit nobis nemo laborum, error ratione assumenda obcaecati impedit velit! Voluptate, neque quos! Itaque quod, molestiae minus nihil assumenda incidunt aut iste dolorem ipsum at asperiores et reiciendis excepturi veritatis laudantium animi delectus voluptas repudiandae suscipit dignissimos harum? Dolores quae ullam, officia cum vero, ea voluptatem optio minima officiis asperiores excepturi amet dignissimos sapiente dolorem voluptate. Quidem, nihil quas quaerat voluptate blanditiis unde vitae repudiandae error? Repudiandae consectetur quia minima est nemo! Illum, vel! Laborum, eos harum.')

const css = ref(null)

onMounted(() => {
  if (props.data.config.content && props.data.config.content !== '') {
    content.value = props.data.config.content
  }
  if (props.data.config.css) {
    css.value = props.data.config.css
  }
})
</script>

<style lang="scss" scoped></style>
