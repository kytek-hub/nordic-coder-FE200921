const baseLink = 'http://207.148.117.182:3090/api/'


export const getData = (url) => {
  return postGateWay("GET", undefined, url)
}

export const postData = (body) => {
  return postGateWay("POST", body)
}

export const putData = (body) => {
  return postGateWay("PUT", body)
}

const postGateWay = async (type, body, url = '') => {
  const params = {
    method: type,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  console.log(params)
  // Post function JSON string body object
  if (body) {
    params.body = JSON.stringify(body)
  }
  console.log(params)
  console.log(baseLink + url)
  const response = await fetch(baseLink + url, params)
  const responseJSON = await response.json()

  if (response.status === 200) {
    return responseJSON
  }
  return null
}