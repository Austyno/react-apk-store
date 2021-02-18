import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAllPosts } from '../actions/postActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Post from '../components/Post'

const Posts = () => {
	const dispatch = useDispatch()
	const listpost = useSelector((state) => state.allPost)

	const { loading, error, posts } = listpost

	useEffect(() => {
		dispatch(listAllPosts())
	}, [dispatch])
	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Container className='mt-5 mb-5'>
					<Row className="py-3 p-3">
						{posts.map((p) => (
							<Post post={p} />
						))}
					</Row>
				</Container>
			)}
		</>
	)
}

export default Posts
