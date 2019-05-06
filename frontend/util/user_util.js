export const fetchUsers = () => (
  $.ajax({
    method: 'GET',
    url: '/api/users'
  });
)