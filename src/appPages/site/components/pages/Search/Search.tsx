"use client";
import { useUserQuery } from "@/redux/api/user";
import s from "./Search.module.scss";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";
import userr from "@/assets/user.png";

const Search = ({ onClose }: any) => {
  const { data } = useUserQuery();
  const [text, setText] = useState("");
  const [recentList, setRecentList] = useState<any[]>([]);

  // Фильтрация пользователей по username
  const filteredUsers = data?.filter((user: any) =>
    user.username.toLowerCase().includes(text.toLowerCase())
  );

  const handleAddToRecent = (user: any) => {
    // Добавляем только если такого пользователя ещё нет в recentList
    if (!recentList.find((item) => item.username === user.username)) {
      setRecentList((prev) => [...prev, user]);
    }
  };

  const handleClearAll = () => {
    setRecentList([]);
  };

  return (
    <section className={s.Search}>
      <div className={s.wrapper}>
        <div className={s.page}>
          <h1>Search</h1>

          <button className={s.close} onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        <div className={s.content}>
          <input
            type="search"
            placeholder="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className={s.recent}>
            <div className={s.header}>
              <h4>Recent</h4>
              <span onClick={handleClearAll}>Clear all</span>
            </div>
            <div className={s.lists}>
              {text ? (
                filteredUsers?.length ? (
                  filteredUsers.map((user: UserList) => (
                    <div
                      key={user.id}
                      className={s.resultItem}
                      onClick={() => handleAddToRecent(user)}
                    >
                      <Image
                        src={user.profile_picture || userr}
                        alt="avatar"
                        width={50}
                        height={50}
                      />
                      <h6> {user.username}</h6>
                    </div>
                  ))
                ) : (
                  <div className={s.noResults}>No users found</div>
                )
              ) : recentList.length ? (
                recentList.map((user) => (
                  <div key={user.id} className={s.listItem}>
                    {user.username}
                  </div>
                ))
              ) : (
                <div className={s.noRecent}>No recent users</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
