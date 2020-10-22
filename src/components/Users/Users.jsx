import React from "react";
import s from './Users.module.css'
import * as axios from 'axios'
import userPhoto from '../../assets/images/default-avatar.png'


class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then((response) => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount)
        }
    )
    }

    setCurrentPage = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then((response) => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            }
        )
    }

    render() {
        const pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i)
        }

        return (
            <div className={s.users}>
                {
                    pages.map((p, i) => {
                            const pageStyle = p === this.props.currentPage ? s.active_page : "";
                            return (
                                <span key={i}
                                      className={pageStyle}
                                      onClick={() => this.setCurrentPage(p)}> {p} </span>
                            )
                        }
                    )}


                {
                    this.props.users.map(u => <div key={u.id} className={s.user_block}>

                            <div className={s.user_left}>
                                <img src={u.photos.small ? u.photos.small : userPhoto} className={s.avatar}/>
                                {u.followed ?
                                    <button className={s.btn} onClick={() => this.props.unfollow(u.id)}>Unfollow</button> :
                                    <button className={s.btn} onClick={() => this.props.follow(u.id)}>Follow</button>}
                            </div>

                            <div className={s.user_right}>
                                <div className={s.info}>
                                    <div>{u.name}</div>
                                    <div>{u.status}</div>
                                </div>
                                <div className={s.place}>
                                    <div>{"u.location.country"}</div>
                                    <div>{"u.location.city"}</div>
                                </div>
                            </div>

                        </div>
                    )
                }

            </div>)
    }
}

export default Users;


// [
//     {
//         id: 1,
//         avatar: "https://finance.kz/static/images/default-avatar.png",
//         followed: false,
//         fullName: "Alex",
//         status: "Worker",
//         location: {
//             country: "Belarus",
//             city: "Minsk"
//         }
//     },
//     {
//         id: 2,
//         avatar: "https://finance.kz/static/images/default-avatar.png",
//         followed: true,
//         fullName: "John",
//         status: "Frontend developer",
//         location: {
//             country: "Poland",
//             city: "Krakow"
//         }
//     },
//     {
//         id: 3,
//         avatar: "https://finance.kz/static/images/default-avatar.png",
//         followed: false,
//         fullName: "Jessica",
//         status: "Singer",
//         location: {
//             country: "USA",
//             city: "New-York"
//         }
//     }
// ]