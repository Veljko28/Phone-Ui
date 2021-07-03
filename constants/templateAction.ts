const templateAction = (type: string) => ( payload: any) => ({
  type,
  payload
});

export default templateAction;