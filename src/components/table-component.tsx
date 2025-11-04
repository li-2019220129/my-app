import { ElTable, ElTableColumn } from "element-plus";
import { defineComponent } from "vue";
export default defineComponent({
  props: { data: Array, col: Array },
  setup(props: any) {
    return () => (
      <ElTable data={props.data} style="width: 100%">
        {props.col.map((column: any) => (
          <ElTableColumn
            key={column.property}
            prop={column.property}
            label={column.label}
            width={column.width}
            minWidth={column.minWidth}
            fixed={column.fixed}
            sortable={column.sortable}
            showOverflowTooltip={column.showOverflowTooltip}
            type={column.type}
            v-slots={{
              default: column.slot?.default,
              header: column.slot?.header,
            }}
          />
        ))}
      </ElTable>
    );
  },
});
