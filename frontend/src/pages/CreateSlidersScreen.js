import React, { useState, useEffect } from 'react';
import {
	Card,
	Col,
	Container,
	FormFile,
	FormLabel,
	Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createSlider } from '../actions/sliderActions';
import { CREATE_SLIDER_RESET } from '../constants/sliderConstants';

const CreateSlidersScreen = ({ history }) => {
	const [name, setName] = useState('');
	const [image, setImage] = useState('');

	const dispatch = useDispatch();
	const createstate = useSelector(state => state.createSlider);

	const { loading, error, success } = createstate;

	useEffect(() => {
		if (success) {
			dispatch({
				type: CREATE_SLIDER_RESET,
			});
			history.push('/admin/sliders');
		}
	}, [success, dispatch, history]);

	const preview = e => {
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.onload = () => {
			const dataURL = reader.result;
			setImage(dataURL);
		};
		reader.readAsDataURL(file);
	};

	const submitHandle = e => {
		e.preventDefault();

		if (name === '' || image === '') {
			return;
		}

		const data = {
			name,
			image,
		};
		dispatch(createSlider(data));
	};
	return (
		<>
			<Container>
				<Col md={6} className='mx-auto mb-5 mt-4' style={{}}>
					{loading ? (
						<Loader />
					) : error ? (
						<Message>{error}</Message>
					) : (
						<Card className='mt-5 py-4' style={{ marginTop: '30px' }}>
							<Card.Text
								as='h5'
								className='mb-3 text-center'
								style={{
									fontFamily: 'American Typewriter',
									fontWeight: 'bold',
								}}>
								Add New Slider Image
								<div
									className='d-flex mr-3'
									style={{ background: 'red', width: '70px', float: 'right' }}>
									{image && (
										<img
											src={image}
											alt=''
											name='image'
											style={{ height: '70px', width: '70px' }}
										/>
									)}
								</div>
							</Card.Text>

							<hr />
							<Container>
								<Row>
									<Col md={4}>
										<FormLabel
											for='Image Name'
											style={{
												fontFamily: 'American Typewriter',
												fontWeight: 'bold',
											}}>
											Image Name
										</FormLabel>
									</Col>
									<Col md={6}>
										<input
											value={name}
											onChange={e => setName(e.target.value)}
											placeholder='Image Name'
										/>
									</Col>
								</Row>
								<Row className='mt-2'>
									<Col md={4}>
										<FormLabel
											for='file'
											style={{
												fontFamily: 'American Typewriter',
												fontWeight: 'bold',
											}}>
											Choose Image
										</FormLabel>
									</Col>
									<Col md={6}>
												<FormFile
													
											className='form-control'
											name='image'
											label='select image'
											custom
											onChange={e => preview(e)}></FormFile>
									</Col>
								</Row>
								<hr />
								<div className='row d-flex justify-content-around align-items-center'>
									<button
										onClick={e => submitHandle(e)}
										className='btn btn-primary block mb-5 w-50'>
										Create
									</button>
								</div>
							</Container>
						</Card>
					)}
				</Col>
			</Container>
		</>
	);
};

export default CreateSlidersScreen;
