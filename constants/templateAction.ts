const templateAction = (type: any) => ( payload: string) => ({
  type,
  payload
});

export default templateAction;