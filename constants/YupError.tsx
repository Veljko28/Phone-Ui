
const YupError = ({errors, path, fontSize, color}: {errors:  Array<{ path: string | undefined; message: string }>, path: string, fontSize?: number,
color?: string}) => {

    if (errors.length === 0){
      return null;
    }

    const has = errors.filter((x: any) => x.path === path);

    if (has.length === 0){
      return null;
    }

    const message = (has[0] as any)?.message;

    if (message === null) return null;

    const upper = (message[0].toUpperCase() + message.substring(1)).replace(/_/g, " ");

    return (
     <span style={{marginLeft: 10, fontSize: fontSize ? fontSize : 12, color: color ? color : "red"}} key={path}>
       {upper}
      </span>
    )
}

export default YupError;