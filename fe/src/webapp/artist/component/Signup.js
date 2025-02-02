import React, { useCallback, useState } from 'react';
import 'webapp/artist/style/ArtistSignup.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signupPage } from 'webapp/artist/reducer/artist.reducer';

const Signup = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [signup, setSignup] = useState({
        username: '',
        password: '',
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        school: '',
        department: '',
    });

    const { username, password, name, phoneNumber, email, address, school, department } = signup;

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setSignup({
                ...signup,
                [name]: value,
            });
        },
        [signup]
    );

    const [files, setFiles] = useState([]);

    const clickUpdate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const fileObject = e.target;
        console.dir(fileObject.files);
        setFiles(fileObject.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files[' + i + ']', files[i]);
        }

        formData.append('username', signup.username);
        formData.append('password', signup.password);
        formData.append('name', signup.name);
        formData.append('email', signup.email);
        formData.append('phoneNumber', signup.phoneNumber);
        formData.append('address', signup.address);
        formData.append('school', signup.school);
        formData.append('department', signup.department);


        await dispatch(signupPage(formData));
        alert(JSON.stringify(signup.username) + "님 회원가입을 환영합니다.")
        history.push('/artists/artists-signin');
    };

    const cancelButton = (e) => {
        e.preventDefault();
        window.location = '/';
    };


    return (
        <>
            <form action="/action_page.php" className="ArtistSignupHead">
                <div className="container">
                    <h1 className="text-center">Philo_Arte 회원가입(Sign Up)</h1>
                    <hr />
                    <input type="file" name="file" id="reviewFileDtoList" className="md-textarea" rows="7" multiple={true} onChange={(e) => clickUpdate(e)}></input>
                    <label htmlFor="username">
                        <b>아이디</b>
                    </label>
                    <input type="text" placeholder="Enter Username" name="username" value={username} onChange={handleChange} />

                    <label htmlFor="password">
                        <b>비밀번호</b>
                    </label>
                    <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handleChange} />

                    <label htmlFor="name">
                        <b>이름</b>
                    </label>
                    <input type="text" placeholder="Enter Name" name="name" value={name} onChange={handleChange} />

                    <label htmlFor="email">
                        <b>E-Mail</b>
                    </label>
                    <input type="text" placeholder="Enter Email" name="email" value={email} onChange={handleChange} />

                    <label htmlFor="phoneNumber">
                        <b>핸드폰 번호</b>
                    </label>
                    <input type="text" placeholder="Enter PhoneNumber" name="phoneNumber" value={phoneNumber} onChange={handleChange} />

                    <label htmlFor="address">
                        <b>주소</b>
                    </label>
                    <input type="text" placeholder="Enter Address" name="address" value={address} onChange={handleChange} />

                    <label htmlFor="school">
                        <b>학교</b>
                    </label>
                    <input type="text" placeholder="Enter School" name="school" value={school} onChange={handleChange} />

                    <label htmlFor="department">
                        <b>소속</b>
                    </label>
                    <input type="text" placeholder="Enter Department" name="department" value={department} onChange={handleChange} />

                    <div class="clearfix">
                        <button type="button" className="btn btn-color btn-md btn-default remove-margin pull-left" onClick={(e) => cancelButton(e)}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success btn-md btn-default remove-margin pull-right"
                            onClick={(e) => {
                                handleSubmit(e);
                                // register(e);
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
export default Signup;
