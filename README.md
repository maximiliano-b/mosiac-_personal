It seems there's a typo in your mutation definition. Let's correct it.

In your `UPDATE_VEHICLE` mutation, you have:

```graphql
const UPDATE_VEHICLE = gql`
  mutation updateVehicleViolation($id: uuid!, $violation: Boolean!) {
    update_vehicle_information_by_
    pk(pk_columns: { id: $id }, _set: { violation: $violation }) {
      created_at
      updated_at
      violation
    }
  }
`;
```

There's a typo in `update_vehicle_information_by_`. It should be `update_vehicle_information_by_pk`. Here's the corrected mutation:

```graphql
const UPDATE_VEHICLE = gql`
  mutation updateVehicleViolation($id: uuid!, $violation: Boolean!) {
    update_vehicle_information_by_pk(pk_columns: { id: $id }, _set: { violation: $violation }) {
      created_at
      updated_at
      violation
    }
  }
`;
```
