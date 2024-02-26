import { useMutation, useQuery } from "react-query";
import { getUserId } from "../utils";
import createRequest from "../utils/request";

const shoppingService = {
  useQueryGetProfile({ id, onSuccess, onError }) {
    return useQuery(
      ["getProfile"],
      async () => {
        const path = `/user/${id}`;
        try {
          const res = await createRequest.post(path);
          return res?.data;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );
  },
  useQueryGetProduct({ queryObj, onSuccess, onError }) {
    return useQuery(
      ["getProduct"],
      async () => {
        const path = `/product/${queryObj?.filter || "all"}`;
        try {
          const res = await createRequest.post(path);
          return res?.data?.data;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );
  },

  useQueryGetCart({ onSuccess, onError }) {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    return useQuery(
      ["getCart"],
      async () => {
        const path = `/user/${getUserId()}`;
        try {
          const res = await createRequest.post(path);
          return res?.data?.cart;
        } catch (error) {
          // await AlertWarning({
          //   title: "กรุณาเข้าสู่ระบบอีกครั้ง!",
          //   onOk: () => {
          //     setUser(null);
          //     setUserId(null);
          //     setCartUser(null);
          //     setToken(null);
          //     dispatch(clear_item());
          //     dispatch(item_clear());
          //     navigate("/login");
          //   },
          // });
          throw error;
        }
      },
      {
        onSuccess,
        onError,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );
  },

  useQueryGetOrderHistory({ status, onSuccess, onError }) {
    return useQuery(
      ["getOrderHistory"],
      async () => {
        const path = `/order/getOrderByUserId`;
        const query = { userId: getUserId(), status };
        try {
          const res = await createRequest.post(path, query);
          return res?.data;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );
  },

  // ---------------------------------- useMutation -------------------

  useMutationOrder(onSuccess, onError) {
    return useMutation(
      async (values) => {
        const { cartId, address } = values;
        const path = `/order`;
        const query = { cartId, address };
        try {
          const res = await createRequest.post(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },

  useMutationUpdateCart(onSuccess, onError) {
    return useMutation(
      async (values) => {
        const { cartId, cartList } = values;
        const path = `/cart/updateCart`;
        const query = { cartId, cartList };
        try {
          const res = await createRequest.post(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },

  useMutationLogin(onSuccess, onError) {
    return useMutation(
      async (values) => {
        const { username, password } = values;
        const path = `/user/login`;
        const query = { username, password };
        try {
          const res = await createRequest.post(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },
  useMutationGetUser(onSuccess, onError) {
    return useMutation(
      async (values) => {
        const { id } = values;
        const path = `/user/${id}`;
        try {
          const res = await createRequest.post(path);
          return res.data;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },

  useMutationRegister(onSuccess, onError) {
    return useMutation(
      async (values) => {
        const { firstname, lastname, gender, phone, username, password } =
          values;
        const path = `/user`;
        const query = {
          firstname,
          lastname,
          gender,
          phone,
          username,
          password,
        };
        try {
          const res = await createRequest.post(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },

  useMutationConfirmOrder(onSuccess, onError) {
    return useMutation(
      async ({ id, slip }) => {
        const path = `/order/purchaseOrder`;
        const query = { id, slip };
        try {
          const res = await createRequest.put(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },

  useMutationCancelOrder(onSuccess, onError) {
    return useMutation(
      async ({ orderId }) => {
        const path = `/order/cancelOrder`;
        const query = { orderId };
        try {
          const res = await createRequest.put(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },
  useMutationUpdateProfile(onSuccess, onError) {
    return useMutation(
      async ({ values }) => {
        const path = `/user/updateUserProfile`;
        const query = { ...values };
        try {
          const res = await createRequest.put(path, query);
          return res;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },
  useMutationGetProfile(onSuccess, onError) {
    return useMutation(
      async () => {
        const path = `/user/${getUserId()}`;
        try {
          const res = await createRequest.post(path);
          return res?.data;
        } catch (error) {
          throw error;
        }
      },
      {
        onSuccess,
        onError,
      }
    );
  },
};

export default shoppingService;
